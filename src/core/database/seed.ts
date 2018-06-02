import {connectToDB} from "./connect";
import {DATABASE} from "./_seeds";
import {getConfig} from "../../_config";
import {getConfigHelper} from "../config/helper";
import * as dotenv from "dotenv";

declare let Object: any

export const seedDatabase = async ({ config }) => {
    let dbConn = await connectToDB({ config })
    await Promise.all(
        Object.entries(DATABASE).map(([table, rows]) =>
            dbConn.getRepository(table).save(rows))
    )
    await dbConn.close()
}

// load environment and config
dotenv.config({ path: ".env" })
const config = getConfigHelper(getConfig(process.env))

seedDatabase({ config }).then( _ => {
    console.log("seeded database", DATABASE)
})