import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import '../css/project.css'
import Card from './Card'

export default function Project({ selectedCategories, selectedCountries, projects, categories, searchTerm, currentPage, projectsPerPage }) {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();

  // ================= filter =================
  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(project.project_category_id);
    const countryMatch = selectedCountries.length === 0 || selectedCountries.includes(project.country);
    const searchMatch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && countryMatch && searchMatch;
  });

  // Calculate the start and end index for the projects to be displayed on the current page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  // ================= filter =================

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "project"].join(" ")}>
      {
        currentProjects.map((project, index) => (    // filter projects based on selected categories
          <Card project={project} categories={categories} key={index} />
        ))
      }
    </div>
  )
}
