import { DependencyContainer } from "tsyringe";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IPostSptLoadMod } from "@spt/models/external/IPostSptLoadMod";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ELocationName } from "@spt/models/enums/ELocationName";

import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";


import { IBossLocationSpawn, IWave } from "@spt/models/eft/common/ILocationBase";

import { ProbabilityObject, ProbabilityObjectArray, RandomUtil } from "@spt/utils/RandomUtil";
import { MathUtil } from "@spt/utils/MathUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { FileSystemSync } from "@spt/utils/FileSystemSync";

import { BotHelper } from "@spt/helpers/BotHelper";

import { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";
import {  ILocations } from "@spt/models/spt/server/ILocations";

import { MinMax } from "@spt/models/common/MinMax";
import { ISeasonalEventConfig } from "@spt/models/spt/config/ISeasonalEventConfig";
import { ILocation } from "@spt/models/eft/common/ILocation";
import { IBotCore } from "@spt/models/eft/common/tables/IBotCore";

class FixZombieSpawn implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void 
    {
        const logger: ILogger = container.resolve<ILogger>("WinstonLogger");

        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        const infectionHalloween = tables.globals.config.SeasonActivity.InfectionHalloween;

        if(infectionHalloween.Enabled)  
        {
            logger.info("FixZombieSpawn-Dectect infectionHalloween, ACTIVE_HALLOWEEN_ZOMBIES_EVENT insert to bots.core");
            tables.bots.core["ACTIVE_HALLOWEEN_ZOMBIES_EVENT"] = true;
        }
    }
}

export const mod = new FixZombieSpawn();