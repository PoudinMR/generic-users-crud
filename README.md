# generic-users-crud
A generic Sequelize-based API to get users and companies
<h2>Presentation</h2>
<p>This project is a CRUD API using Sequelize as an ORM. Sequelize uses the mysql dialect here so make sure you have a correct installation of mysql running.</p>
<p>The database contains two tables, a Company table and a User table, a company has a name and an address, a user has a name and a creation date.</p>
<p>These tables have a two-way 0..n relationship, so a user can belong to many companies and a company can have many users.</p>

The API offers two routes 
<ul>
 <li>/company : to access companies as well as add users through the /company/:companyId/users route</li>
 <li>/user : to access users </li>
</ul>

When using the GET endpoints, the API returns each entity with a list of the other associated with it, users will return associated companies and vice versa.

<h2>Setup</h2>
<p>To run this back-end, go to the root of the project and run <code>node bin/www</code></p>
<p>You can also run tests by running <code>npm run test</code></p>
<p>For database access, the .env file is still present in the sources for test purposes, so you can use the credentials specified there.</p>

<h2>Additional considerations</h2>
<p>The API currently doesn't have parameter validation, this could be added as a middleware passed to requests to verify the validity of query params/bodies</p>
<p>In terms of security, authentication could also be implemented</p>
