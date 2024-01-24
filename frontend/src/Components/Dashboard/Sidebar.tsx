import LatestNotes from "./LatestNotes";
import CategoryList from "./CategoryList";
import { DashboardContext } from "../../types";

type SidebarProps = {
    dashboardContext: DashboardContext;
}

export default function Sidebar({ dashboardContext }: SidebarProps) {
    const { categoriesFetch, selectedCategory, setSelectedCategory, setShowAddCategory, setShowEditCategory } = dashboardContext;
    return (
        <div className='dashboard-sidebar'>
            <section className="category-list">
                <CategoryList
                    categoriesFetch={categoriesFetch}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setShowAddCategory={setShowAddCategory}
                    setShowEditCategory={setShowEditCategory}
                />
            </section>
            <section>
                <strong>Your latest notes</strong>
                <hr />
                <LatestNotes />
            </section>
        </div>
    )
}