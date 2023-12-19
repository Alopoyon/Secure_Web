<template>
    <div>
        <button type="button"  class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Create New Note
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">
                        <input v-model="editedTitle" class="form-control" placeholder="Title">
                    </h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <textarea v-model="editableContent" class="form-control"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" @click="createNewList" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>

        
        <ol class="list-group list-group-numbered w-50">
            <li 
            class="list-group-item d-flex justify-content-between align-items-start list-group-item-action"
            v-for="(list, index) in lists" :key="index">
                <div class="ms-2 me-auto">
                <div class="fw-bold">{{list.heading}} -- {{ list.id }}</div>
                
                <div class="d-inline-block text-truncate " style="max-width: 500px;">
                    {{list.body}}
                </div>
                <div class="col text-end float-lg-end">
                    <button @click="deleteElement(index)" class="btn btn-white"><i class="fa-solid fa-trash" style="color: #ff0000;"></i></button>
                    <button @click="editList(list.id)" class="btn btn-white"><i class="fa-solid fa-pen-to-square"></i></button>
                </div>
                </div>
                <!-- <span class="badge bg-primary rounded-pill">14</span> -->
            </li>    
        </ol>
    </div>
</template>

<script>
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
        index: this.nextListId,
        id: Math.ceil(Math.random()*1000000),
        heading: this.editedTitle,
        body: this.editableContent,
      };
      this.lists.push(newList);
      console.log(this.lists)

      this.nextListId++;
    },
    editList(id){

    },
    deleteElement(index){
        this.lists.splice(index, 1);
    }
  },
};
</script>