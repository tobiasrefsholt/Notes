import SidebarLatestNotes from "./SidebarLatestNotes";
import CategoryList from "./CategoryList";
import { DashboardContext } from "../../types";
import SidebarUserActions from "./SidebarUserActions";

type SidebarProps = {
    dashboardContext: DashboardContext;
}

export default function Sidebar({ dashboardContext }: SidebarProps) {
    const { categoriesFetch, selectedCategory, setSelectedCategory } = dashboardContext;
    return (
        <div className='dashboard-sidebar'>
            <section className="user">
                <SidebarUserActions />
            </section>
            <section className="category-list">
                <CategoryList
                    categoriesFetch={categoriesFetch}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </section>
            <section style={{marginTop: "auto"}}>
                <strong>Your latest notes</strong>
                <SidebarLatestNotes />
            </section>
        </div>
    )
}