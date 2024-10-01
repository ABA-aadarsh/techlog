import React from 'react'
import BtnWithDialog from './BtnWithDialog'

const SettingPanel = ({id,publicStatus=false}) => {
    const updatePublicStatus = async ()=>{
    }
    const deleteLog = async ()=>{

    }
  return (
    <div>
        <ul>
            <li>
                <BtnWithDialog
                    heading={`Delete log: ${id}`}
                    message={"This action is irrevertible and would cause permanent loss of the log. Are you sure about deleting this log?"}
                    onConfirmFunction={deleteLog}
                    triggerText={"Delete Log"}
                />
            </li>
            <li>
                <BtnWithDialog
                    heading={"Change Public Status"}
                    message={"Changing the public status of log might cause the server to rebuild certain pages? Are you sure about it?"}
                    onConfirmFunction={updatePublicStatus}
                    triggerText={publicStatus?"Make Private":"Make Public"}
                />
            </li>
        </ul>
    </div>
  )
}

export default SettingPanel