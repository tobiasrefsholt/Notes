import SidebarLatestNotes from "./SidebarLatestNotes";
import CategoryList from "./CategoryList";
import { DashboardContext } from "../../types";
import SidebarUserActions from "./SidebarUserActions";
import ToggleIncludeSubcategories from "./ToggleIncludeSubcategories";

type SidebarProps = {
    dashboardContext: DashboardContext;
}

export default function Sidebar({ dashboardContext }: SidebarProps) {
    const { categoriesFetch, selectedCategory, setSelectedCategory, includeSubcategories, setIncludeSubcategories } = dashboardContext;
    return (
        <div className='dashboard-sidebar'>
            <section className="user">
                <SidebarUserActions />
            </section>
            <section>
                <ToggleIncludeSubcategories includeSubcategories={includeSubcategories} setIncludeSubcategories={setIncludeSubcategories} />
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