import { useState } from "react";
import NotesList from "./NotesList";

export default function Sidebar() {
    const [refreshTimestap, setRefreshTimestap] = useState(0);
    return (
        <div className='dashboard-sidebar'>
            <div className="sidebar-header">
                <strong>Your latest notes</strong>
                <button onClick={()=>{setRefreshTimestap(new Date().getTime())}}>Refresh list</button>
            </div>
            <hr />
            <NotesList refreshTimestap={refreshTimestap} />
        </div>
    )
}