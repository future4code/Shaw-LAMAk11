import { DaysOfShow, Show } from "../model/show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDataBase extends BaseDatabase {
  protected static TABLE_NAME = "Lama_Shows";

  public async createShow(
    id: string,
    week_day: DaysOfShow,
    start_time: number,
    end_time: number,
    band_id: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          week_day,
          start_time,
          end_time,
          band_id,
        })
        .into(ShowDataBase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async VerifyDateShow(week_day: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .where({ week_day })
      .into(ShowDataBase.TABLE_NAME);
    return result;
  }
}
