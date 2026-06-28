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
    <input
      v-if="!useTextArea"
      @input="onInput"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="p-3 bg-blue-100/20 rounded-xl focus:outline-0 border border-gray-300"
    />
    <textarea
      v-else
      @input="onInput"
      :value="modelValue"
      :placeholder="placeholder"
      class="p-3 bg-blue-100/20 rounded-xl focus:outline-0 border border-gray-300 min-h-50"
    ></textarea>
    <small class="text-red-500" v-if="error">{{ error }}</small>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  id: string;
  label: string;
  icon: string;
  type?: "text" | "password" | "email" | "number" | "date";
  error?: string;
  placeholder?: string;
  required?: boolean;
  useTextArea?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  error: "",
  placeholder: "Input...",
  required: false,
  type: "text",
  useTextArea: false,
});

const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
