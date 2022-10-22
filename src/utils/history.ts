import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

const history = createBrowserHistory({ window });

export { HistoryRouter, history };
