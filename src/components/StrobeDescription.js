import { Link } from 'react-router-dom';

const StrobeDescription = () => {
  return (
    <div className="wrapper">
      <p className="desc">
        우리 눈이 세상을 완전히 연속해서 보는 것 같지만 사실은 그렇지 않습니다.<br/>
        뇌는 눈을 통해 들어오는 시각 정보를 애니메이션의 프레임 처럼 계속해서 초당 수십장의 프레임으로 찍습니다.
        그리고 이전 프레임과 다음 프레임 이미지를 비교해서 사물의 움직임을 해석하고 '연속적으로 움직인다'라고 느낍니다.
      </p>

      <img className="desc"
        src="/assets/images/animation-frame-stop-motion.png" alt="animation-frame-stop-motion.png"
      />

      <p className="desc">
        아래의 그림은 시간의 흐름에 따라 frame1 -&gt; frame2 -&gt; frame3 로 변화하는 물방울의 움직임의 예시를 보여줍니다.
      </p>

      <img className="desc"
        src="/assets/images/frame_example.png" alt="frame_example.png"
      />

      <p className="desc">
        각 frame의 검은색 화살표가 가리키는 방향이 물방울의 실제 이동방향입니다. 중력에 의해 아래로 떨어지는 중이죠.<br/>
        이때 떨어지는 속도가 매우 빨라서, 실제로는 frame1~2~3 사이에도 물방울이 연속해서 떨어지고 있었지만
        뇌는 그 모든 장면을 다 보지 못하고 frame1 다음 보게된 장면이 frame2 입니다.<br/>
        이때 뇌에서는 착시 효과가 일어납니다. (물방울 색깔은 모두 동일하지만 설명을 위해서 임시로 구분하겠습니다.)<br/>
        frame1의 초록색으로 표시한 물방울과 가장 가까운 frame2 에서의 물방울은 빨강색 입니다.
        그 둘은 원래 다른 물방울이죠.<br/>
        그러나 뇌는 frame1 초록색 물방울이 frame2에서 빨간색 물방울의 위치로, frame3에서 주황색 물방울의 위치로 이동했다고
        <strong> 착각</strong> 하게됩니다.
      </p>

      <img className="desc"
        style={{width: 200}}
        src="/assets/images/hertz.jpg" alt="hertz.jpg"
      />

      <p className="desc">
        따라서 우리는 단위 시간 당 발생 빈도수를 조절하는 것으로 이러한 현상을 직접 실험해 볼 수 있습니다.<br/>
        축약하여 설명하자면 물방울 생성 주파수 보다 관측 주파수 값을 약간 더 크게해서 엇박자를 내면 착시현상이 일어난다고 할 수 있습니다.<br/>
        말이 어려우니까 직접 실험해보겠습니다.<br/>
        물방울이 떨어지는 속도가 일정한 어떤 값이라고 할때,<br/>
        물방울이 0.1초 당 1방울씩 생성되어 떨어지고 그보다 살짝 빠른 0.09초 마다 물방울을 관측한다고 하겠습니다.<br/>
        만약 0.1초 마다 관측한다면, 물방울이 0.1초 마다 하나씩 생겨나므로 계속 똑같은 상태의 물방울들을 보게됩니다.<br/>
        그러나 물방울이 제 위치에 도달하기 전 조금 빠르게 0.09초에 관측한다고 하면,
        위에서 본 색깔 물방울 그림과 같은 상황이 되고 마찬가지로 뇌가 착시 현상을 일으켜서
        물방울이 위로 거슬러 올라간다고 멋대로 해석하게됩니다.
      </p>

      <p className="desc">
        아래 링크로 들어가서 직접 실험해 볼 수 있습니다.
      </p>

      <p className="nav-sub">
        <Link to="/strobe">착시현상 실험</Link><br/>
        <Link to="/">홈으로</Link>
      </p>

      <footer className="footer-sub-page">
        © 2022 <a href="https://github.com/seungwubaek">SammyBaek.</a> All Rights Reserved.
      </footer>
    </div>
  );
}

export default StrobeDescription;
