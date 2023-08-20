import path from 'node:path'
import { move } from './build-translate'

move(path.resolve(process.cwd(), './packages/anov-3d/lib'), path.resolve(process.cwd(), './example/lib'))
move(path.resolve(process.cwd(), './packages/anov-3d-utils/lib'), path.resolve(process.cwd(), './example/lib-utils'))