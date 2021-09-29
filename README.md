
## React Table using

:point_right: pagination
:point_right: filtering
:point_right: sorting

**using [lodash](https://lodash.com/docs/4.17.15) for sorting:**
```bash
npm i --save lodash
```
# Usage
```javascript
import lodash from 'lodash'
...
const usersSorted = lodash.orderBy(filteredUsers, [sortBy.name], [sortBy.order])
```

In the project directory, you can run:

### `npm start`

