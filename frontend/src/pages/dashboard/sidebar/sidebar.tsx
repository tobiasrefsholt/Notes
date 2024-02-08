import SidebarLatestNotes from "./latestNotes";
import CategoryList from "./categoryList";
import { DashboardContext } from "../../../types";
import SidebarUserActions from "./userCard";
import ToggleIncludeSubcategories from "./toggleIncludeSubcategories";

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