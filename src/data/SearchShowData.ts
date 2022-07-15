import { BaseDatabase } from "./BaseDatabase";
import { ShowInputDTO } from "../model/show";

export class SearchShowData extends BaseDatabase {
  protected static TABLE_NAME = "Lama_Shows";

  select = async (week_day: string) => {
    try {
      const result = await this.getConnection()
        .raw(`select banda.name, banda.music_genre from Lama_Shows shows 
      inner join Lama_Bandas banda on shows.band_id=banda.id
      where shows.week_day = "${week_day}"
      order by shows.start_time`);

      return result[0];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
