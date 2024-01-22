import { Avatar } from '@/components/common/avatar/Avatar'
import Canvas from '@/components/common/canvas/Canvas'
import Options from '@/components/common/options/Options'
import Toolbar from '@/components/common/toolbar/Toolbar'

const page = () => {
  return (
    <section>
        <Toolbar />
        <Avatar />
        <Options />
        <Canvas />
    </section>
  )
}

export default page