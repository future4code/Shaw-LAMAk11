import { Request, Response } from "express";
import { Show, ShowInputDTO } from "../model/show";
import { ShowBusiness } from "../business/ShowBusiness";
import moment from "moment";
import { createTypeQueryNode } from "typescript";

export class ShowController {
  async addShow(req: Request, res: Response) {
    try {
      const { week_day, start_time, end_time, band_id } = req.body;
      if (!week_day || !start_time || !end_time || !band_id) {
        throw new Error("campos obrigatorio");
      }

      moment.locale("pt-br");
      const start_minute = moment(start_time, "HH:mm").minutes();
      const end_minute = moment(end_time, "HH:mm").minutes();
      if (start_minute !== 0 || end_minute !== 0) {
        throw new Error("Permitido somente horas cheias!");
      }

      const start = moment(start_time, "HH:mm").isSameOrAfter(
        moment("08:00", "HH:mm")
      );
      const end = moment(end_time, "HH:mm").isSameOrBefore(
        moment("23:00", "HH:mm")
      );
      if (!start || !end) {
        throw new Error("horario valido das 08:00 as 23:00");
      }

      const startHours = moment(start_time, "HH:mm").hours();
      const endHours = moment(end_time, "HH:mm").hours();

      const show: ShowInputDTO = {
        week_day,
        start_time: startHours,
        end_time: endHours,
        band_id,
      };

      const business = new ShowBusiness();
      await business.createShow(show);
      res.status(200).send({ success: true });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  search = async (req: Request, res: Response) => {
    const week_day = req.query.weekday as string;
    console.log(req.params);
    try {
      if (!week_day) {
        throw new Error("Dia da semana obrigatório!");
      }
      const business = new ShowBusiness();
      const result = await business.search(week_day);
      res.status(200).send({ result });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };
}
