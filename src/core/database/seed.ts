import {connectToDB} from "./connect";
import {DATABASE} from "./_seeds";
import {getConfig} from "../../_config";
import {getConfigHelper} from "../config/helper";
import * as dotenv from "dotenv";

const program = require('commander')

declare let Object: any

export const seedDatabase = async ({ config, clearTables }) => {
    let dbConn = await connectToDB({ config })
    let ops = Object.entries(DATABASE).map(async ([table, rows]) => {
        let repo = dbConn.getRepository(table)
        if(clearTables) await repo.clear()
        await repo.save(rows)
    })
    await Promise.all(ops)
    await dbConn.close()
}

// load environment and config
dotenv.config({ path: ".env" })
const config = getConfigHelper(getConfig(process.env))

program
    .version('1.0.0')
    .option('-c, --clear-tables <shouldClear>', 'Will truncate tables first if set to true')
    .parse(process.argv)

let clearTables = (program.clearTables == 'true')
if(clearTables) console.log("truncating tables..")

seedDatabase({ config, clearTables }).then( _ => {
    console.log("seeded database", DATABASE)
})
