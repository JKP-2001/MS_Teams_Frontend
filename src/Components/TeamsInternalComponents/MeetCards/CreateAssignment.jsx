import React, { useState } from 'react'
import NavbarCoponent from '../../NavbarComponet/NavbarCoponent'
import SideBarComponent from '../../SideBarComponent/SideBarComponent'
import GeneralNavBar from './GeneralNavBar';

const CreateAssignment = () => {

    const [topNav, setToNav] = useState(<GeneralNavBar />);

  return (
    <div>
      <NavbarCoponent />
      <div className="flex">
        <div>
          <SideBarComponent />
        </div>
      </div>
    </div>
  )
}

export default CreateAssignment