import CategoryList from "./CategoryList";

export default CategoryTree() {
    type prop = {
        categories: category[];
    }

    const CategoryTree = ({ categories }:prop) => {
        const renderTree = (categories:category[], parentGuid:string|null = null) => (
          <ul>
            {categories
              .filter(category => category.parentGuid === parentGuid)
              .map(category => (
                <li key={category.guid} onClick={() => {setSelectedCategory(category.guid)}} className={selectedCategory === category.guid ? "bold-text" : ""}>
                  {category.name}
                  {renderTree(categories, category.guid)}
                </li>
              ))}
          </ul>
        );
      
        return <div>{renderTree(categories)}</div>;
      };
}