import { ShowDataBase } from "../data/ShowDataBase";
import { ShowInputDTO } from "../model/show";
import { IdGenerator } from "../services/IdGenerator";
import moment from "moment";
import { SearchShowData } from "../data/SearchShowData";

export class ShowBusiness {
  async createShow(show: ShowInputDTO) {
    const showDataBase = new ShowDataBase();

    const hour = {
      start: moment({ hour: show.start_time }),
      end: moment({ hour: show.end_time }),
    };

    const result: ShowInputDTO[] = await showDataBase.VerifyDateShow(
      show.week_day
    );

    result.forEach((show) => {
      console.log(show);
      const i = moment({ hour: show.start_time });
      const j = moment({ hour: show.end_time });

      if (hour.start.isBetween(i, j) || hour.end.isBetween(i, j)) {
        throw new Error("Horário indisponível!");
      }
    });

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    await showDataBase.createShow(
      id,
      show.week_day,
      show.start_time,
      show.end_time,
      show.band_id
    );
  }

  async verifyDateShow(show: ShowInputDTO) {
    const showDataBase = new ShowDataBase();
    const result = await showDataBase.VerifyDateShow(show.week_day);
    console.log(result);
  }

  public search = async (week_day: string) => {
    const searchShowData = new SearchShowData();
    const result = await searchShowData.select(week_day);
    return result;
  };
}
