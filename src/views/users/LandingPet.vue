<template>
    <h3>Pet's landing page</h3>
    <div v-if="pet">
        <p>{{ pet.petsName }}</p>
        <p>{{ pet.ownerName }}</p>
        <p>{{ pet.gender }}</p>
        <p>{{ pet.breed }}</p>
    </div>
</template>

<script>
import getPetDetail from '@/composables/getPetDetail'

export default {
    props: ['id'],
    setup(props) {
        const { pet, error } = getPetDetail('petDetail', props.id)

        return { pet, error }
    }
}
</script>

<style>

</style>