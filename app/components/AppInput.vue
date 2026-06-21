<template>
  <div class="w-full">
    <label :for="id" v-if="label" class="text-white font-bold mx-1"
      >{{ label }} <span class="text-red-500" v-if="required">*</span>
    </label>
    <input
      :value="modelValue"
      @input="onInput"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      class="bg-white border border-blue-300 my-2 w-full rounded-xl p-3"
      :class="inputClass"
    />

    <small class="text-red-500 mb-4" v-if="error">{{ error }}</small>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number;
  label?: string;
  type: string;
  placeholder?: string;
  id: string;
  required?: boolean;
  error?: string;
  inputClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
  label: "",
  placeholder: "",
  inputClass: "",
});
// This emit will get called by vue on v-model in the exact naming convention so v-model in vue will work cause of this emit
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

// When User types emit the new value
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
