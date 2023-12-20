<template>
    <div>
        <button type="button"  class="btn btn-info" data-bs-toggle="modal" data-bs-target="#createListModal">
            Create New Note
        </button>
        
        <EditableModal></EditableModal>
        <!-- Modal -->
        <div class="modal fade" id="createListModal" tabindex="-1" aria-labelledby="createListModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">
                        <input v-model="editedTitle" class="form-control" placeholder="Title" value="">
                    </h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <textarea v-model="editableContent" value="" class="form-control h-auto" @input="resize()" ref="textarea"  rows="10" ></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="createNewList" class="btn btn-info" data-bs-dismiss="modal">Save changes</button>
                </div>
                </div>
            </div>
        </div>
        
        <ol class="list-group list-group-numbered w-50">
            <li 
            class="list-group-item d-flex justify-content-between align-items-start list-group-item-action"
            v-for="(list, index) in lists" :key="index">
                <div class="fw-bold text-capitaliz">{{list.heading}} -- {{ list.id }}</div><hr class="mt-1 mb-1"/>
                
                <div class="text-truncate " style="max-width: 500px;">
                    {{list.body}}
                </div>
                <div class="text-end float-lg-end">
                    <button @click="deleteElement(index)" class="btn btn-white"><i class="fa-solid fa-trash" style="color: #ff0000;"></i></button>
                    <button @click="editList(list.id)" class="btn btn-white" data-bs-toggle="modal" data-bs-target="#createListModal"><i class="fa-solid fa-pen-to-square"></i></button>
                </div>
                <!-- <span class="badge bg-primary rounded-pill">14</span> -->
            </li>    
        </ol>
    </div>
</template>

<script>
import EditableModal from './EditableModal.vue';
export default {
  data() {
    return {
      lists: [],
      nextListId: 1,
      editedTitle: '',
      editableContent: '',
    };
  },
  methods: {
    createNewList() {
      // Generate a new list and add it to the lists array
      const newList = {
        index: this.nextListId+1,
        id: Math.ceil(Math.random()*1000000),
        heading: this.editedTitle,
        body: this.editableContent,
      };
      this.lists.push(newList);
      console.log(this.lists)

      ++this.nextListId;
    },
    editList(id){

    },
    deleteElement(index){
        this.lists.splice(index, 1);
    },
    resize() {
      let element = this.$refs["textarea"];
      if(this.editableContent.length > 550){
        element.rows += 10;
      }
    },
  },
  
};
</script>