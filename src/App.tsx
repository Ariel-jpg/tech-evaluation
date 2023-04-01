import PhotoDay from './features/photoDay/PhotoDay';
import { palette1 } from './features/common/ColorPalettes';

function App() {
  const theme = palette1();

  return (
    <div className="App">
      <PhotoDay theme={theme} />
    </div>
  )
}



export default App