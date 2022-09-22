import { UserRouter } from "../components";
import { CharacterRouter } from "../components";
import { MovieRouter } from "../components";
import { GenderRouter } from "../components";

// cada vez que quiera agregar unaruta nueva,
// creo el path e importo el componente
const listRoutes = [["/auth", UserRouter],["/characters",CharacterRouter],["/movies",MovieRouter],["/gender",GenderRouter]];

export const routes = (app) => {
  listRoutes.forEach(([path, controller]) => {
    app.use(path, controller);
  });
};
