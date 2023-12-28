<script setup>
   import { computed } from 'vue'

   definePageMeta({
      layout: 'custom',
   })

   // TODO:
   // Remove inputs.. Not needed, better to be able to re-sort the inputs and have different types in different order
   // Next: useState..
   // Update form! Test..

   const user = useSupabaseUser()
   const supabase = useSupabaseClient()

   const { plantTypes } = usePlants()
   const filteredPlantTypes = plantTypes.filter(
      make => !['', 'Any'].includes(make)
   )

   const showExtras = ref(false)

   const ageUnitsOptions = [
      'days',
      'weeks',
      'months',
      'years',
   ]
   const ageUnits = ref(ageUnitsOptions[0])

   let ageInDays = computed(() => {
      const ageNum = parseInt(info.value.age)
      switch (ageUnits.value) {
         case 'days':
            return ageNum
         case 'weeks':
            return ageNum * 7
         case 'months':
            return ageNum * 30.41
         case 'years':
            return ageNum * 365.25
      }
   })

   const info = useState('adinfo', () => {
      return {
         type: '',
         age: 0,
         commonName: '',
         lengthOfCare: 0,
         source: '',
         indoor: '',
         scientificName: '',
         nativeTo: '',
         ecotype: '',
         availability: [],
         image: null,
      }
   })

   const onChangeInput = (data, name) => {
      info.value[name] = data
   }

   const errorMessage = ref('')

   const inputs = [
      {
         id: 1,
         title: 'Common name *',
         name: 'commonName',
         placeholder: 'Lucky bamboo',
      },
      {
         id: 2,
         title: 'Scientific name *',
         name: 'scientificName',
         placeholder: 'Dracaena sanderiana',
      },
      {
         id: 3,
         title: 'Price *',
         name: 'price',
         placeholder: '10000',
      },
   ]

   const isButtonDisabled = computed(() => {
      // for (let key in info.value) {
      // for (let key in { type, age, commonName }) {
      //    if (!info.value[key]) {
      //       return true
      //    }
      // }
      return false
   })

   const handleSubmit = async () => {
      const fileName = Math.floor(
         Math.random() * 10000000000000000000
      )

      const { data, error } = await supabase.storage
         .from('images')
         .upload('public/' + fileName, info.value.image)

      if (error) {
         return (errorMessage.value = 'Cannot upload image')
      }

      const body = {
         // FIX!!!

         ...info.value,
         type: info.value.type,
         age: Math.floor(ageInDays.value),
         commonName: info.value.commonName,
         indoor: '', // FIX
         listerId: user.value.id,
         image: data.path,
         // lengthOfCare: parseInt(info.value.lengthOfCare), ???
         // lengthOfCare: parseInt(1), // FIX
         lengthOfCare: 0, // FIX
         availability: [], // FIX
      }

      console.log({ body })

      try {
         const response = await $fetch(
            '/api/plant/listings',
            {
               method: 'post',
               body,
            }
         )

         alert(
            `Great success. Your ${info.value.commonName} was listed!`
         )

         console.log('HEYA!')

         // clearForm()

         // navigateTo('/profile/listings')
      } catch (err) {
         errorMessage.value = err.statusMessage

         console.log('Removing image??')
         // await supabase.storage
         //    .from('images')
         //    .remove(data.path)
      }
   }

   const clearForm = () => {
      // Clear state of child comps - childXComp.value accesses comp instance
      childImageComponentRef.value.clearImage()
      childSelectComponentRef.value.clearState()
      childTAComponentRef.value.clearState()

      for (let childInputComponentRef of childInputComponentsRef.value) {
         // refs stored as arr on .value
         childInputComponentRef.clearInput()
      }
   }

   const childImageComponentRef = ref(null)
   const childInputComponentsRef = ref(null)
   const childSelectComponentRef = ref(null)
   const childTAComponentRef = ref(null)
</script>

<template>
   <div>
      <div class="mt-24 flex items-center">
         <UIcon
            name="i-ph-plant-bold"
            size="3em"
            class="mr-3"
            dynamic
         />
         <h1 class="text-6xl">Add a Plant</h1>
      </div>

      <PlantAddInput
         ref="childInputComponentsRef"
         title="Common name *"
         name="commonName"
         placeholder="eg. Lucky bamboo"
         @change-input="onChangeInput"
      />
      <PlantAddInput
         ref="childInputComponentsRef"
         title="Scientific name"
         name="scientificName"
         placeholder="eg. Dracaena sanderiana"
         @change-input="onChangeInput"
      />

      <PlantAddSelect
         class="mt-5"
         ref="childSelectComponentRef"
         title="Plant type *"
         :options="filteredPlantTypes"
         name="type"
         @change-input="onChangeInput"
      />
      <div class="flex items-center">
         <PlantAddInput
            ref="childInputComponentsRef"
            title="Age (days) *"
            name="age"
            placeholder="eg. 30"
            @change-input="onChangeInput"
         />
         <PlantAddSelect
            v-model="ageUnits.value"
            class="mt-6 w-10"
            ref="childSelectComponentRef"
            title=""
            :options="ageUnitsOptions"
            name="ageUnits"
            @change-input="onChangeInput"
         />
         <!-- <USelect
            class="mt-6 ml-3 min-w-24 cursor-pointer"
            v-model="ageUnits"
            :options="ageUnitsOptions"
         /> -->
      </div>

      <UButton
         @click="showExtras = !showExtras"
         class="mt-10 mb-6"
         :label="
            showExtras
               ? '- Hide extra fields'
               : '+ Show extra fields'
         "
      ></UButton>

      <div v-if="showExtras">
         <PlantAddSelect
            ref="childSelectComponentRef"
            title="Where did you get it?"
            :options="[
               'Grew from seed',
               'Cutting',
               'Purchased',
               'Gift',
            ]"
            name="source"
            @change-input="onChangeInput"
         />
         <PlantAddSelect
            ref="childSelectComponentRef"
            title="Indoors or out?"
            :options="['Indoor', 'Outdoor', 'Both']"
            name="indoor"
            @change-input="onChangeInput"
         />

         <PlantAddInput
            ref="childInputComponentsRef"
            title="Native country"
            name="nativeTo"
            placeholder="eg. South Africa"
            @change-input="onChangeInput"
         />

         <PlantAddSelect
            ref="childSelectComponentRef"
            title="Native habitat"
            :options="[
               'Forest',
               'Grassland',
               'Desert',
               'Rainforest',
            ]"
            name="ecotype"
            @change-input="onChangeInput"
         />
         <PlantAddSelect
            ref="childSelectComponentRef"
            title="Availability"
            :options="[
               'For sale',
               'Will trade',
               'Free to good home',
            ]"
            name="availability"
            @change-input="onChangeInput"
         />
      </div>

      <PlantAddImage
         class="mt-6"
         ref="childImageComponentRef"
         @change-input="onChangeInput"
      />

      <div class="w-full text-center">
         <button
            :disabled="isButtonDisabled"
            @click="handleSubmit"
            class="bg-blue-400 text-white rounded py-2 px-7 mt-8"
         >
            Create
         </button>
         <p v-if="errorMessage" class="mt-3 text-red-400">
            {{ errorMessage }}
         </p>
      </div>
   </div>
</template>
