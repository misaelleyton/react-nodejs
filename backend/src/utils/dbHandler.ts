import * as fs from 'fs'
import type { Vehicle } from '../types'
import path from 'path'
const dataPath = path.join(__dirname, '/../../db/db.json') // path to our JSON file

const getVehiclesFromFile = (data: Partial<Vehicle>): Vehicle[] => {
  const jsonData = fs.readFileSync(dataPath)
  const db = JSON.parse(jsonData.toString()) as Record<string, Vehicle[]>
  console.log(db)
  console.log('veh')
  console.log(db.vehicles)
  const filterResults: Vehicle[] = db.vehicles.filter((vehicle: Vehicle) => {
    return vehicle.type === data.type && data.location === vehicle.location
  })
  return filterResults
}
// util functions
// const saveTree = (data: TreeNode) => {
//     const previous_data = getTreeData();
//     previous_data.push(data);
//     const stringifyData = JSON.stringify(previous_data);
//     fs.writeFileSync(dataPath, stringifyData);
//     return getTreeData();
// }

// const getMaxId = () => {
//     const ids = getTreeData();
//     const max_id = Math.max(...ids.map((o: TreeNode) => o.id));
//     return max_id + 1;
// }

// const getTreeData = () => {
//     const jsonData = fs.readFileSync(dataPath);
//     return JSON.parse(jsonData.toString());
// }

export { getVehiclesFromFile }
