import { useState } from "react";

const Sidebar = ({ onCategorySelect, categories = [], products = [] }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleClick = (category) => {
    setActiveCategory(category);
    onCategorySelect(category);
  };

  const getCount = (category) => {
    if (category === "All") return products.length;
    return products.filter(p =>
      Array.isArray(p.category) ? p.category.includes(category) : p.category === category
    ).length;
  };

  return (
    <ol className="list-group list-group-numbered">
      {categories.map((category, index) => (
        <li
          key={index}
          className={`list-group-item d-flex justify-content-between align-items-start ${
            activeCategory === category ? "list-group-item-danger" : ""
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(category)}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{category}</div>
          </div>
          <span className="badge text-bg-danger rounded-pill">{getCount(category)}</span>
        </li>
      ))}
    </ol>
  );
};

export default Sidebar;