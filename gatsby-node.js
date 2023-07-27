const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
 
  const { data } = await graphql(`
  query getAllProductIds {
    allContentfulPizza {
      nodes {
        id
        name
      }
    }
  }
  `)

  //console.log(data) 

  data?.allContentfulPizza?.nodes?.forEach(node => {

    const id = node.id
    const modifiedSlug = node.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()

    actions.createPage({
      path: modifiedSlug,
      component: path.resolve('./src/templates/ItemTemplate.js'),
      context: { id, modifiedSlug }
    })
  })

/*   categories.data.mdx.frontmatter.categories.forEach(category => {

    const categoryUrl = category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()
    const categoryName = category
    actions.createPage({
        path: categoryUrl,
        component: path.resolve('./src/templates/ProductListTemplate.js'),
        context: { categoryName }
      })
  }) */
}
