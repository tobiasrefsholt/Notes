import NotesList from "../Components/Notes/NotesList";
import SingleNote from "../Components/Notes/SingleNote";

function NotesDashbord() {
    return (
        <>
            <div className="">
                <NotesList />
                <SingleNote />
            </div>
        </>
    )
}

export default NotesDashbord;