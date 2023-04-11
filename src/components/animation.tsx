import Lottie from 'react-lottie-player';
import mainJson from '../../public/main.json';


export function MainAnimation() {
  return <Lottie loop animationData={mainJson} play style={{ margin: 'auto' }} />;
}

