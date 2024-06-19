import {createContext} from 'react';
import {appContextProps} from './AppTypes';
import {AppContextModel} from './appcontext.d';
const AppContext = createContext<AppContextModel>(appContextProps);

export default AppContext;
