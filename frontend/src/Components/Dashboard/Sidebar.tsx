import SidebarLatestNotes from "./SidebarLatestNotes";
import CategoryList from "./CategoryList";
import { DashboardContext } from "../../types";

type SidebarProps = {
    dashboardContext: DashboardContext;
}

export default function Sidebar({ dashboardContext }: SidebarProps) {
    const { categoriesFetch, selectedCategory, setSelectedCategory } = dashboardContext;
    return (
        <div className='dashboard-sidebar'>
            <section className="category-list">
                <CategoryList
                    categoriesFetch={categoriesFetch}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </section>
            <section>
                <strong>Your latest notes</strong>
                <hr />
                <SidebarLatestNotes />
            </section>
        </div>
    )
}