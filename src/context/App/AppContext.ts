import {createContext} from 'react';
import {AppContextModel} from '../../interface/AppContext';
import {appContextProps} from './AppTypes';

const AppContext = createContext<AppContextModel>(appContextProps);

export default AppContext;
