// import { Children } from "react"
import PageTitle from "./components/PageTitle"
import AppHeader from "./components/AppHeader"
import style from './style/modules/app.module.scss'
import AppContent from "./components/AppContent"
import {Toaster} from 'react-hot-toast';

function App() {

  return (
    <>
    <PageTitle>TODO LIST</PageTitle>
    <div className={style.app__wrapper}>
      <AppHeader></AppHeader>
      <AppContent></AppContent>
    </div>
    <Toaster position="bottom-right"
    toastOptions={{
      style:{
        fontSize: '1.4rem'
      }
    }
    }/>
    </>
  )
}

export default App
