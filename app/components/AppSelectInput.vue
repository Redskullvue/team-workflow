<template>
  <div
    class="w-full bg-white rounded-xl p-7 flex flex-col gap-3 border border-gray-300 my-2"
  >
    <label :for="id" class="mb-2 flex items-center">
      <Icon :name="icon" size="18px" class="text-blue-500" />
      <span class="font-semibold mx-2"
        >{{ label }} <span v-if="required" class="text-red-500">*</span></span
      >
    </label>
    <select
      :id="id"
      class="bg-blue-100/20 p-3 rounded-xl cursor-pointer focus:outline-0 border border-gray-300"
      @change="onChange"
      :value="modelValue"
    >
      <option value="">Select...</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <small class="text-red-500" v-if="error">{{ error }}</small>
  </div>
</template>

<script setup lang="ts">
// Interface for the props structure
interface Props {
  modelValue: string;
  id: string;
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  icon: string;
}

const props = withDefaults(defineProps<Props>(), {
  error: "",
  required: false,
});
// Creating one emit for this component
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
// change triggerd on the select will cal the onChange method here which will emit the selected data to the parent
const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
};
</script>
