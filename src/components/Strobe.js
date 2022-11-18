import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components/macro';

const stdComp = {
  Window: styled.div`
    border: 1px solid black;
    border-radius: 5px;
    margin: 4px;
    width: 100%;
    max-width: 150px;
    height: 200px;
  `,
  WindowLight: styled.div`
    position: absolute;
    border-radius: 5px;
    width: 100%;
    max-width: 150px;
    height: 200px;
    /* top: ${props => `${props.windowSize.top}px`};
    left: ${props => `${props.windowSize.left}px`}; */
    background-color: ${props => props.lightOn?'transparent':'black'};
    z-index: 2;
  `,
  WaterBall: styled.div`
    position: absolute;
    background-color: blue;
    border-radius: 50%;
    width: ${props => `${props.ballState.size}px`};
    height: ${props => `${props.ballState.size}px`};
    top: ${props => `${props.ballState.yPos}px`};
    left: ${props => `${props.windowSize.left + props.windowSize.width/2 - props.ballState.size/2}px`};
    z-index: 1;
  `,
}

const Window = React.forwardRef((props, ref) => {
  return (
    <stdComp.Window ref={ref}>
      {props.children}
    </stdComp.Window>
  );
})

const WindowLight = React.forwardRef((props, ref) => {
  return (
    <stdComp.WindowLight windowSize={props.windowSize} lightOn={props.lightOn}></stdComp.WindowLight>
  );
})

const WaterBall = React.forwardRef((props, ref) => {
  return (
    <stdComp.WaterBall windowSize={props.windowSize} ballState={props.ballState}></stdComp.WaterBall>
  )
});

const handleSpeed = (targetName, direction, speedDirector, setSpeedDirector) => {
  speedDirector[targetName] = speedDirector[targetName] + speedDirector.timeSpeed*direction
  setSpeedDirector({...speedDirector});
}

const Strobe = (props) => {
  const windowRef = React.createRef();
  const [windowSize, setWindowSize] = useState({top: 0, bottom: 0, left: 0, width: 0});
  const [isFirst, setIsFirst] = useState(true);
  const [ballStateArr, setBallStateArr] = useState([]);
  const [lightOn, setLightOn] = useState(!props.hasLighter);
  const [lightController, setLightController] = useState(props.hasLighter);
  const [speedDirector, setSpeedDirector] = useState({
    timer: 0, timeSpeed: 5, dropRange: 5, dropSpeed: 2, creationSpeed: 10, lightSpeed: 8,
  });

  const getWindowSize = useCallback((e) => {
    // Initialize & Calculate window size after render
    const windowElem = windowRef.current;
    const windowTop = windowElem.offsetTop;
    const windowBottom = windowTop + windowElem.clientHeight;
    setWindowSize({
      top: windowTop,
      bottom: windowBottom,
      left: windowElem.offsetLeft,
      width: windowElem.clientWidth});
  }, [windowRef]);

  useEffect(()=>{
    if(isFirst) {
      getWindowSize();
      speedDirector.dropSpeed *= speedDirector.timeSpeed;
      speedDirector.creationSpeed *= speedDirector.timeSpeed;
      speedDirector.lightSpeed *= speedDirector.timeSpeed;
      setSpeedDirector({...speedDirector});
      setIsFirst(()=>!isFirst);
    }
  }, [isFirst, getWindowSize, speedDirector]);

  useEffect(() => {
    if(!isFirst) {
      const interval = setInterval(()=>{
        // 주기적 물방울 생성
        let timer = speedDirector.timer;
        if(timer%speedDirector.creationSpeed === 0) {
          ballStateArr.unshift({yPos: windowSize.top, isNew: true, size: 10});
          setBallStateArr(()=>[...ballStateArr]);
        }

        // (가상의 중력에 의한) 물방울 추락
        if(timer%speedDirector.dropSpeed === 0) {
          ballStateArr.forEach((val, idx, obj) => {
            // 새 물방울은 천정에 1 frame 고여있음
            if(ballStateArr[idx].isNew) {
              ballStateArr[idx].isNew = false
              return
            }
            // 물방울 추락 거리 per 1 frame
            ballStateArr[idx].yPos += speedDirector.dropRange;
          });
          // 맨 아래 물방울과 바닥 충돌 처리
          const lastIdx = ballStateArr.length-1;
          if(lastIdx >= 0) {
            if(ballStateArr[lastIdx].yPos+5 >= windowSize.bottom) {
              ballStateArr.splice(lastIdx, 1);
            }
            setBallStateArr(()=>[...ballStateArr]);
          }
        }
        speedDirector.timer += speedDirector.timeSpeed;
        setSpeedDirector({...speedDirector});

        // Light On/Off
        if(lightController) {
          if(timer%speedDirector.lightSpeed === 0) {
            setLightOn(true);
          } else if(lightOn && timer%2 === 0) setLightOn(false);
        } else {
          setLightOn(true);
        }
      }, speedDirector.timeSpeed);

      return () => clearInterval(interval);
    }
  }, [windowRef, windowSize, speedDirector, setSpeedDirector, isFirst, ballStateArr, lightController, lightOn]);

  return (
    <div className={"wrapper"+`${props.isUpper?'':' bottom-strobe'}`}>
      {
        props.isUpper &&
        <div className="controller">
          <span>깜박임: {props.hasLighter?'On':'Off'}</span><br/>
          <span>물방울 생성 간격: {speedDirector.creationSpeed/speedDirector.timeSpeed}</span><br/>
          <span>빛 깜박임 간격: {speedDirector.lightSpeed/speedDirector.timeSpeed}</span>
          <div className="ctrl-btn-set">
            <button className="ctrl-btn" onClick={()=>handleSpeed('lightSpeed', 1, speedDirector, setSpeedDirector)}>+</button>
            <button className="ctrl-btn" onClick={()=>setLightController(!lightController)}>{lightController?'On':'Off'}</button>
            <button className="ctrl-btn" onClick={()=>handleSpeed('lightSpeed', -1, speedDirector, setSpeedDirector)}>-</button>
          </div>
        </div>
      }
      {
        !props.isUpper &&
        <p>원본</p>
      }
      <Window ref={windowRef}>
        {props.hasLighter && <WindowLight windowSize={windowSize} lightOn={lightOn}></WindowLight>}
        {
          lightOn && ballStateArr.map((val, idx, obj) => {
            return <WaterBall key={idx} windowSize={windowSize} ballState={ballStateArr[idx]}></WaterBall>
          })
        }
      </Window>
      {
        !props.isUpper && <>
          <p className="nav-sub">
            <Link to="/description">착시현상 설명</Link><br/>
            <Link to="/">홈으로</Link>
          </p>
          <footer className="footer-sub-page">
            © 2022 <a href="https://github.com/seungwubaek">SammyBaek.</a> All Rights Reserved.
          </footer>
        </>
      }
    </div>
  )
}

export default Strobe;
