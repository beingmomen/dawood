# Custom useAPI Composable in Nuxt

Based on Nuxt 4 documentation for creating a custom useFetch.

## Installation

The custom API is provided via a plugin and composable.

Files created:
- `plugins/api.js`
- `composables/useAPI.js`

## Usage

In your components or pages:

```vue
<script setup>
const { data, pending, error } = await useAPI('/articles');
</script>
```

### Features
- Base URL from runtimeConfig.public.apiBaseUrl
- Global error handling (e.g., redirect on 401)

### Error Handling
If there's an error, `error.value` will contain error information.

## Example

Assume you have an endpoint `/articles`:

```vue
<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>{{ data }}</div>
  </div>
</template>

<script setup>
const { data, pending, error } = await useAPI('/articles');
</script>
```