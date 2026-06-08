<template>
  <div class="w-full">
    <label :for="id" v-if="label" class="text-white font-bold mx-1"
      >{{ label }} <span class="text-red-500" v-show="required">*</span>
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

    <small class="text-red-500 mb-4" v-show="error">{{ error }}</small>
  </div>
</template>

<script setup>
const props = defineProps({
  // This will act as v-model in parent components
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: { type: String, default: "" },
  type: { type: String, required: true, default: "text" },
  placeholder: { type: String, default: "" },
  //   Element id for refrence
  id: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  error: { type: String, default: "" },
  //   Custom Classes For Input
  inputClass: { type: String, default: "" },
});
// This emit will get called by vue on v-model in the exact naming convention so v-model in vue will work cause of this emit
const emit = defineEmits(["update:modelValue"]);

// When User types emit the new value
const onInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
