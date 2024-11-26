document.addEventListener('DOMContentLoaded', () => {
  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/members');
      const members = await response.json();

      const membersList = document.getElementById('members-list');
      membersList.innerHTML = '';

      members.forEach((member) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${member.name}</td>
          <td>${member.email}</td>
          <td>${member.phone}</td>
          <td>${member.feePackage}</td>
          <td>
            <button onclick="editMember('${member._id}')">Edit</button>
            <button onclick="deleteMember('${member._id}')">Delete</button>
          </td>
        `;
        membersList.appendChild(row);
      });
    } catch (err) {
      alert('Failed to fetch members.');
    }
  };

  const addMemberForm = document.getElementById('add-member-form');
  if (addMemberForm) {
    addMemberForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const memberData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        feePackage: document.getElementById('feePackage').value.trim(),
      };

      try {
        const response = await fetch('http://localhost:5000/api/members', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(memberData),
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message);
          fetchMembers();
          document.getElementById('add-member-section').style.display = 'none';
          document.getElementById('members-section').style.display = 'block';
        } else {
          alert(result.message);
        }
      } catch (err) {
        alert('Error adding member.');
      }
    });
  }

  window.editMember = async (id) => {
    const newName = prompt('Enter new name:');
    const newEmail = prompt('Enter new email:');
    const newPhone = prompt('Enter new phone:');
    const newFeePackage = prompt('Enter new fee package:');

    if (newName && newEmail && newPhone && newFeePackage) {
      try {
        const response = await fetch(`http://localhost:5000/api/members/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newName,
            email: newEmail,
            phone: newPhone,
            feePackage: newFeePackage,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message);
          fetchMembers();
        } else {
          alert(result.message);
        }
      } catch (err) {
        alert('Error updating member.');
      }
    } else {
      alert('All fields are required for updating.');
    }
  };

  window.deleteMember = async (id) => {
    if (confirm('Are you sure you want to delete this member?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/members/${id}`, { method: 'DELETE' });
        const result = await response.json();
        alert(result.message);
        fetchMembers();
      } catch (err) {
        alert('Error deleting member.');
      }
    }
  };

  // Functionality for "Create Bills"
  const createBillsButton = document.getElementById('create-bills-btn');
  if (createBillsButton) {
    createBillsButton.addEventListener('click', () => {
      alert('Feature to create bills is under development.');
    });
  }

  // Functionality for "Assign Fee Package"
  const assignFeePackageButton = document.getElementById('assign-fee-package-btn');
  if (assignFeePackageButton) {
    assignFeePackageButton.addEventListener('click', () => {
      alert('Feature to assign fee packages is under development.');
    });
  }

  // Functionality for "Assign Notification"
  const assignNotificationButton = document.getElementById('assign-notification-btn');
  if (assignNotificationButton) {
    assignNotificationButton.addEventListener('click', () => {
      alert('Feature to assign notifications is under development.');
    });
  }

  // Functionality for "Report Export"
  const reportExportButton = document.getElementById('report-export-btn');
  if (reportExportButton) {
    reportExportButton.addEventListener('click', () => {
      alert('Feature to export reports is under development.');
    });
  }

  // Functionality for "Supplement Store"
  const supplementStoreButton = document.getElementById('supplement-store-btn');
  if (supplementStoreButton) {
    supplementStoreButton.addEventListener('click', () => {
      alert('Feature to manage the supplement store is under development.');
    });
  }

  // Functionality for "Diet Details"
  const dietDetailsButton = document.getElementById('diet-details-btn');
  if (dietDetailsButton) {
    dietDetailsButton.addEventListener('click', () => {
      alert('Feature to manage diet details is under development.');
    });
  }

  // Logout Functionality
  const logoutButton = document.getElementById('logout-btn');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      alert('Logged out successfully!');
      window.location.href = 'login.html'; // Redirect to login page
    });
  }

  // View Members Button
  const viewMembersButton = document.getElementById('view-members-btn');
  if (viewMembersButton) {
    viewMembersButton.addEventListener('click', () => {
      document.getElementById('add-member-section').style.display = 'none';
      document.getElementById('members-section').style.display = 'block';
      fetchMembers();
    });
  }

  // Add Member Button
  const addMemberButton = document.getElementById('add-member-btn');
  if (addMemberButton) {
    addMemberButton.addEventListener('click', () => {
      document.getElementById('add-member-section').style.display = 'block';
      document.getElementById('members-section').style.display = 'none';
    });
  }

  // Fetch members initially
  fetchMembers();
});
