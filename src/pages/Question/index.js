import React from 'react'
//import { Route, Routes } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import SideNavigation from '../../components/SideNavigation/SideNavigation.jsx'
import QuizIcon from '@mui/icons-material/Quiz';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CreateIcon from '@mui/icons-material/Create';
import BarChartIcon from '@mui/icons-material/BarChart';

const index = () => {

  const items = [
    {
      name: 'Recommended Questions',
      icon: <AutoAwesomeIcon />,
      link: 'recommended'
    },
    {
      name: 'My Questions',
      icon: <QuizIcon />,
      link: 'my'
    },
    {
      name: 'My Answers',
      icon: <CreateIcon />,
      link: 'answers'
    },
    {
      name: 'Stats',
      icon: <BarChartIcon />,
      link: 'stats'
    }
  ]

  return (
    <div>
      <Navbar />
      <SideNavigation menuItems={items}/>
      {/* <Routes>
        <Route path="/question/recommended" element={<RecommendedQuestions />} />
        <Route path="/question/my" element={<MyQuestions />} />
        <Route path="/question/answers" element={<MyAnswers />} />
        <Route path="/question/stats" element={<Stats />} />
      </Routes> */}
    </div>
  )
}

export default index
