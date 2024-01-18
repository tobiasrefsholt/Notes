import NotesList from "./NotesList";

export default function Sidebar() {
    return (
        <div className='dashboard-sidebar'>
            <strong>Your latest notes</strong>
            <hr />
            <NotesList />
        </div>
    )
}