<script setup>
   definePageMeta({
      layout: 'custom',
      middleware: ['page-auth'],
   })

   // TODO:
   // Remove inputs.. Not needed, better to be able to re-sort the inputs and have different types in different order

   const user = useSupabaseUser()
   const supabase = useSupabaseClient()

   const { plantTypes } = usePlants()
   const filteredPlantTypes = plantTypes.filter(
      make => !['', 'Any'].includes(make)
   )

   const showExtras = ref(false)

   const isLoading = ref(false)

   const ageUnitsOptions = [
      'days',
      'weeks',
      'months',
      'years',
   ]

   const ageInDays = computed(() => {
      const ageNum = parseInt(info.value.age)
      switch (info.value.ageUnits) {
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
         ageUnits: ageUnitsOptions[0],
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

   const clearInfo = () => {
      for (let key in info.value) {
         info.value[key] = null
      }
   }

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
      for (let key of [
         'type',
         'age',
         'commonName',
         'image',
      ]) {
         if (!info.value[key]) {
            return true
         }
      }
      return false
   })

   const { findBDay } = useDate()

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
         created: new Date(),
         bday: findBDay(-ageInDays.value, 0, 0), // FIXX!!!
         type: info.value.type,
         age: Math.floor(ageInDays.value),
         // Need to change age in days to plant-bday! Bc this will change as time goes on.. drrr!
         commonName: info.value.commonName,
         indoor: '', // FIX
         listerId: user.value.id,
         image: data.path,
         // lengthOfCare: parseInt(info.value.lengthOfCare), ???
         // lengthOfCare: parseInt(1), // FIX
         lengthOfCare: 0, // FIX
         availability: [], // FIX
      }

      delete body.ageUnits // Not needed (used for compute)

      console.log('BD: ', findBDay(-ageInDays.value, 0, 0))
      // console.log('bdayPostgres: ', bdayPostgres)

      console.log({ body })

      try {
         isLoading.value = true
         const response = await $fetch(
            '/api/plant/listings',
            {
               method: 'post',
               body,
            }
         )

         isLoading.value = false
         alert(
            `Great success. Your ${info.value.commonName} was listed!`
         )

         clearForm()
         clearInfo()
         showExtras.value = false
      } catch (err) {
         isLoading.value = false
         errorMessage.value = err.statusMessage

         await supabase.storage
            .from('images')
            .remove(data.path)
      }
   }

   const commonNameInputRef = ref(null)
   const scientificNameInputRef = ref(null)
   const typeSelectRef = ref(null)
   const ageInputRef = ref(null)
   const sourceSelectRef = ref(null)
   const indoorSelectRef = ref(null)
   const nativeToInputRef = ref(null)
   const ecotypeSelectRef = ref(null)
   const availabilitySelectRef = ref(null)
   const plantImageInputRef = ref(null)

   const clearForm = () => {
      const clearInputs = inputs => {
         for (let input of inputs) {
            input.value.clearState()
         }
      }
      clearInputs([
         commonNameInputRef,
         scientificNameInputRef,
         typeSelectRef,
         ageInputRef,
      ])

      showExtras.value
         ? clearInputs([
              sourceSelectRef,
              indoorSelectRef,
              nativeToInputRef,
              ecotypeSelectRef,
              availabilitySelectRef,
           ])
         : ''

      plantImageInputRef.value.clearImage()
   }
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
         <h1 class="text-4xl md:text-6xl">Add a Plant</h1>
      </div>

      <PlantAddInput
         name="commonName"
         ref="commonNameInputRef"
         title="Common name *"
         placeholder="eg. Lucky bamboo"
         @change-input="onChangeInput"
      />

      <PlantAddInput
         name="scientificName"
         ref="scientificNameInputRef"
         title="Scientific name"
         placeholder="eg. Dracaena sanderiana"
         @change-input="onChangeInput"
      />

      <PlantAddSelect
         class="mt-4"
         name="type"
         ref="typeSelectRef"
         title="Plant type *"
         :options="filteredPlantTypes"
         @change-input="onChangeInput"
      />

      <div class="flex items-center">
         <PlantAddInput
            name="age"
            ref="ageInputRef"
            title="Age *"
            placeholder="eg. 30"
            @change-input="onChangeInput"
         />
         <PlantAddSelect
            class="ml-3 mt-9"
            name="ageUnits"
            @change-input="onChangeInput"
            ref="childSelectComponentRef"
            :options="ageUnitsOptions"
            :default="ageUnitsOptions[0]"
            :width="24"
         />
      </div>

      <PlantAddImage
         label="Plant photo"
         labelClass="text-sm"
         key="create"
         :showTitle="true"
         icon="i-heroicons-photo"
         title="Upload Image *"
         class="mt-8"
         ref="plantImageInputRef"
         @change-input="onChangeInput"
      />

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
            name="source"
            ref="sourceSelectRef"
            title="Where did you get it?"
            :options="[
               'Grew from seed',
               'Cutting',
               'Purchased',
               'Gift',
            ]"
            @change-input="onChangeInput"
            thin
         />
         <PlantAddSelect
            name="indoor"
            ref="indoorSelectRef"
            title="Indoors or out?"
            :options="['Indoor', 'Outdoor', 'Either']"
            @change-input="onChangeInput"
         />

         <PlantAddInput
            name="nativeTo"
            ref="nativeToInputRef"
            title="Native country"
            placeholder="eg. South Africa"
            @change-input="onChangeInput"
         />

         <PlantAddSelect
            name="ecotype"
            ref="ecotypeSelectRef"
            title="Native habitat"
            :options="[
               'Forest',
               'Grassland',
               'Desert',
               'Rainforest',
            ]"
            @change-input="onChangeInput"
            thin
         />
         <PlantAddSelect
            name="availability"
            ref="availabilitySelectRef"
            title="Availability"
            :options="[
               'Not available',
               'For sale',
               'Will trade',
               'Free to good home',
               'Seeds',
               'Cuttings',
            ]"
            @change-input="onChangeInput"
            thin
         />
      </div>

      <div class="w-full text-center">
         <UButton
            :disabled="isButtonDisabled"
            @click="handleSubmit"
            :loading="isLoading"
            class="bg-blue-400 text-white rounded py-2 px-7 mt-8"
         >
            Create
         </UButton>
         <p v-if="errorMessage" class="mt-3 text-red-400">
            {{ errorMessage }}
         </p>
      </div>
   </div>
</template>
