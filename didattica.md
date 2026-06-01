<!-- Source data can be edited in /data/courses.csv -->

<script setup>
import { baseUrl } from './.vitepress/composables/useBaseUrl.ts'

import { data } from './data/csv.data.ts'

const years = data.courses.map( (el) => el.academic_year ).filter((value, index, array) => array.indexOf(value) === index);
</script>

# Didattica (Teaching)

<div v-for="year in years">

### Anno accademico 20{{ year }}/{{ parseInt(year)+1}}

<ul>
  <li  v-for="course in data.courses.filter((el) => el.academic_year == year )">
  "{{ course.title }}" ({{ course.semester }}º semestre, {{course.program}}<span v-if="course.comment">, {{ course.comment }}</span>)
    <span v-if="course.internal_link">: <a v-bind:href="baseUrl+course.internal_link+'/'" target="_top">pagina del corso</a>
    </span>
    <span v-if="course.external_link">: <a v-bind:href="course.external_link"  target="_top">pagina del corso</a>
    </span>
  </li>
</ul>

</div>
