let thoughts = [];
let itemToDelete = null;

function loadInitialData() {
  fetch('scripts/entryData.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      thoughts = json;
      renderThoughts();
      console.log('Sample data loaded');
    })
    .catch(function(error) {
      console.error('Error loading sample data:', error);
    });
}

function renderThoughts() {
  let container = $('#thoughts-container');
  container.empty();

  for (let i = 0; i < thoughts.length; i++) {
    let entry = thoughts[i];

    container.append(`
      <div class="card my-3" data-id="${entry.id}">
        <div class="card-body">
          <h5 class="card-title editable" data-field="fname">${entry.fname} ${entry.lname}</h5>
          <p class="card-text editable" data-field="review">${entry.review}</p>
          <button class="btn btn-primary btn-sm edit-btn">Edit</button>
          <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </div>
      </div>
    `);
  }
}

$('#submission-form').submit(function(e) {
  e.preventDefault();

  let newEntry = {
    id: Date.now(),
    fname: $('#fname').val(),
    lname: $('#lname').val(),
    review: $('#review').val()
  };

  thoughts.push(newEntry);
  renderThoughts();
  this.reset();
});

$('#export-data').click(function() {
  console.log('Exported data:', JSON.stringify(thoughts, null, 2));
});

$(document).on('click', '.edit-btn', function() {
  let card = $(this).closest('.card');

  card.find('.editable').each(function() {
    let field = $(this).data('field');
    let value = $(this).text();
    $(this).html('<input type="text" class="form-control form-control-sm edit-input" data-field="' + field + '" value="' + value + '">');
  });

  $(this).text('Save')
    .removeClass('edit-btn btn-primary')
    .addClass('save-btn btn-success');
});

$(document).on('click', '.save-btn', function() {
  let card = $(this).closest('.card');
  let id = card.data('id');

  card.find('.edit-input').each(function() {
    let field = $(this).data('field');
    let newValue = $(this).val();
    let entry = thoughts.find(function(item) {
      return item.id === id;
    });

    if (field === 'fname') {
      let parts = newValue.split(' ');
      entry.fname = parts[0] || '';
      entry.lname = parts[1] || '';
    } else {
      entry[field] = newValue;
    }
  });

  renderThoughts();
});

$(document).on('click', '.delete-btn', function() {
  let card = $(this).closest('.card');
  itemToDelete = card.data('id');

  let deleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
  deleteModal.show();
});

$('#confirm-delete').click(function() {
  if (itemToDelete !== null) {
    thoughts = thoughts.filter(function(entry) {
      return entry.id !== itemToDelete;
    });
    renderThoughts();
    itemToDelete = null;

    let deleteModalEl = document.getElementById('confirmDeleteModal');
    let deleteModal = bootstrap.Modal.getInstance(deleteModalEl);
    deleteModal.hide();
  }
});

$(document).ready(function() {
  loadInitialData();
});
