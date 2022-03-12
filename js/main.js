// Create object class
function Staff(account, name, email, password, workday, basicSalary, position, workTime) {
    // Declare properties
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.workday = workday;
    this.basicSalary = basicSalary;
    this.position = position;
    this.workTime = workTime;    
}

// Declare method 
Staff.prototype.totalSalary = function () {    
    // if(this.position === "Sếp" ) {
    //     return this.basicSalary * 3
    // } else if(this.position === "Trưởng phòng") {
    //     return this.basicSalary * 2
    // } else {
    //     return this.basicSalary
    // }
    switch (this.position) {
        case "Sếp":
            return this.basicSalary * 3
            break;
        case "Trưởng phòng":
            return this.basicSalary * 2
        default:
            return this.basicSalary
            break;            
    }
};
Staff.prototype.evaluate = function () {    
    if(this.workTime >= 192) {
        return "xuất sắc"
    } else if(this.workTime >= 176) {
        return "giỏi"
    } else if(this.workTime >= 160) {
        return "khá"
    } else {
        return "trung bình"
    }
    
};

// Create object class StaffManager
function StaffManager() {
    this.staffs = [];
}

// Declare method for object class StaffManager
StaffManager.prototype.findById = function (id) {
    return this.staffs.find((item) => item.account === id);
};
StaffManager.prototype.add = function (staff) {
    this.staffs.push(staff);
};
StaffManager.prototype.update = function (staff) {
    const idx = this.staffs.findIndex(item => item.account === staff.account);
    this.staffs[idx] = staff;
};
StaffManager.prototype.delete = function (id) {
    this.staffs = this.staffs.filter(item => item.account !== id);
};

// Declare object class Validation
function Validation() {    
    this.errors = {};
}
// Check valid
Validation.prototype.isValid = function(name, value) {
    // Browse object errors
    return Object.keys(this.errors).length === 0
};
// Check blank
Validation.prototype.required = function(name, value) {
    if(!value) {        
        this.errors[name] = "This field can't be left blank";
    } else {
        delete this.errors[name];
    }
};
// Check account
Validation.prototype.account = function(name, value) {
    const regex = /[0-9]{4,6}/;

    if (regex.test(value)) {
        delete this.errors[name];        
    } else {                
        this.errors[name] = "Invalid account (at least 4 -> 6 numbers)";
    }
};
// Check name
Validation.prototype.name = function(name, value) {
    const regex = /[a-z]{1,15}/;

    if (regex.test(value)) {
        delete this.errors[name];        
    } else {                
        this.errors[name] = "Invalid (only letter a -> z)";
    }
};
// Check email
Validation.prototype.email = function(name, value) {
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (regex.test(value)) {
        delete this.errors[name];        
    } else {                
        this.errors[name] = "Invalid email";
    }
};
// Check password
Validation.prototype.password = function(name, value) {
    const regex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (regex.test(value)) {
        delete this.errors[name];        
    } else {                
        this.errors[name] = "1 special & uppercase & lowercase, & at least 6 character";
    }
};
// Check basicSalary
Validation.prototype.basicSalary = function(name, value) {
    const regex = /[0-9]{7,8}/;

    if (regex.test(value)) {
        delete this.errors[name];        
    } else {                
        this.errors[name] = "Invalid (at least 1000000 -> 20000000)";
    }
};
// Check workTime
Validation.prototype.workTime = function(name, value) {
    const regex = /[0-9]{2,3}/;

    if (regex.test(value)) {
        delete this.errors[name];        
    } else {                
        this.errors[name] = "Invalid (at least 80 -> 200)";
    }
};

const staffManager = new StaffManager();
const validation = new Validation(); 
// let staffs = []; // list staffs

// add staff
document.getElementById('btnThemNV').addEventListener('click', () => {
    const account = document.getElementById('tknv').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const workday = document.getElementById('datepicker').value;
    const basicSalary = +document.getElementById('luongCB').value;
    const position = document.getElementById('chucvu').value;
    const workTime = +document.getElementById('gioLam').value;    
    
    validation.required('tbTKNV', account);
    validation.account('tbTKNV', account);
    validation.required('tbTen', name);
    validation.name('tbTen', name);
    validation.required('tbEmail', email);
    validation.email('tbEmail', email);
    validation.required('tbMatKhau', password);
    validation.password('tbMatKhau', password);
    validation.required('tbNgay', workday);
    validation.required('tbLuongCB', basicSalary);
    validation.basicSalary('tbLuongCB', basicSalary);
    validation.required('tbChucVu', position);
    validation.required('tbGiolam', workTime);
    validation.workTime('tbGiolam', workTime);

    // Browse object
    ['tbTKNV', 'tbTen', 'tbEmail', 'tbMatKhau', 'tbNgay', 'tbLuongCB', 'tbChucVu', 'tbGiolam'].forEach((key) => {
        const error = validation.errors[key];
        document.getElementById(key).innerHTML = error || "";
    });
    
    if(!validation.isValid()) {
        alert("Please fill out all information");
        return;
    }

    // Create object staff from object class Staff
    const staff = new Staff(account, name, email, password, workday, basicSalary, position, workTime);

    // Push object staff to array
    // staffs.push(staff);
    staffManager.add(staff);
    
    // Display staff
    display(staffManager.staffs);

    resetForm();
    // Close modal
    $('#myModal').modal('hide')    
});
// when add => disabled update
document.getElementById('btnThem').addEventListener('click', () => {
    document.getElementById('btnCapNhat').disabled = true;    
    const spanEl = document.getElementsByClassName("sp-thongbao");
    for (let i = 0; i < spanEl.length; i++) {    
        spanEl[i].style.display = 'block';    
    }    
});

// update staff
document.getElementById('btnCapNhat').addEventListener('click', () => {
    const account = document.getElementById('tknv').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const workday = document.getElementById('datepicker').value;
    const basicSalary = +document.getElementById('luongCB').value;
    const position = document.getElementById('chucvu').value;
    const workTime = +document.getElementById('gioLam').value;

    const staff = new Staff(account, name, email, password, workday, basicSalary, position, workTime);

    validation.required('tbTKNV', account);
    validation.account('tbTKNV', account);
    validation.required('tbTen', name);
    validation.name('tbTen', name);
    validation.required('tbEmail', email);
    validation.email('tbEmail', email);
    validation.required('tbMatKhau', password);
    validation.password('tbMatKhau', password);
    validation.required('tbNgay', workday);
    validation.required('tbLuongCB', basicSalary);
    validation.basicSalary('tbLuongCB', basicSalary);
    validation.required('tbChucVu', position);
    validation.required('tbGiolam', workTime);
    validation.workTime('tbGiolam', workTime);

    // Browse object
    ['tbTKNV', 'tbTen', 'tbEmail', 'tbMatKhau', 'tbNgay', 'tbLuongCB', 'tbChucVu', 'tbGiolam'].forEach((key) => {
        const error = validation.errors[key];
        document.getElementById(key).innerHTML = error || "";
    });
    
    if(!validation.isValid()) {
        alert("Please fill out all information");
        return;
    }
    // const index = staffs.findIndex((item) => {
    //     return item.account === account
    // });
    // staffs[index] = staff;
    staffManager.update(staff);
    
    display(staffManager.staffs);
    resetForm();
    // Close modal
    $('#myModal').modal('hide')
});

// find staff
document.getElementById('btnTimNV').addEventListener('click', () => {
    const searchValue = document.getElementById('searchName').value.toLowerCase();

    const newStaffs = staffs.filter((staff) => {
        const name = staff.name.toLowerCase();
        return name.indexOf(searchValue) !== -1;
    })

    display(newStaffs);    
})

// Listen event click from Tbody
document.getElementById('tableDanhSach').addEventListener('click', () => {
    console.log(event.target);
    const targetEl = event.target; // Lay ra tag phat sinh ra event

    const id = targetEl.getAttribute('data-id');
    const type = targetEl.getAttribute('data-type');

    if(type === "delete") {
        handleDelete(id);
    } 
    
    if(type === "update") {
        handleUpdate(id);
    }
});

function handleDelete(id) {
    // delete 1 staff
    // staffs = staffs.filter((staff) => {
    //     return staff.account !== id
    // });

    staffManager.delete(id);

    // update display
    display(staffManager.staffs);
    resetForm();
}

function handleUpdate(id) {
    // const staff = staffs.find((item) => {
    //     return item.account === id;
    // });

    const staff = staffManager.findById(id);

    document.getElementById('tknv').value = staff.account;
    document.getElementById('name').value = staff.name;
    document.getElementById('email').value = staff.email;
    document.getElementById('password').value = staff.password;
    document.getElementById('datepicker').value = staff.workday;
    document.getElementById('luongCB').value = staff.basicSalary;
    document.getElementById('chucvu').value = staff.position;
    document.getElementById('gioLam').value = staff.workTime;

    // when update => disable
    document.getElementById('tknv').disabled = true;
    document.getElementById('btnThemNV').disabled = true;
}

// Solve display
function display(staffs) {
    const tbody = document.getElementById('tableDanhSach');
    const html = staffs.reduce((result, staff) => {
        return(
            result + 
            `<tr>
                <td>${staff.account}</td>
                <td>${staff.name}</td>
                <td>${staff.email}</td>
                <td>${staff.workday}</td>
                <td>${staff.position}</td>
                <td>${staff.totalSalary()}</td>
                <td>${staff.evaluate()}</td>
                <td>
                    <a href="#" class="edit" >
                        <i class="fa fa-edit" style="color:#FFC107;" data-id="${staff.account}" data-type="update" data-toggle="modal" data-target="#myModal"></i>
                    </a>
                    <a href="#" class="delete" >
                        <i class="fa fa-trash" style="color:#F44336;" data-id="${staff.account}" data-type="delete"></i>
                    </a>
                </td>
            </tr>`
        );
    }, "");
    tbody.innerHTML = html;
}

// Solve Reset form
function resetForm() {
    document.getElementById('tknv').value = "";
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('datepicker').value = "";
    document.getElementById('luongCB').value = "";
    document.getElementById('chucvu').value = "";
    document.getElementById('gioLam').value = ""; 
    
    document.getElementById('tknv').disabled = false;
    document.getElementById('btnThemNV').disabled = false;
    document.getElementById('btnCapNhat').disabled = false;

    
}

// account
document.getElementById('tknv').addEventListener("input", (event) => {
    // validation.required('tbTKNV', event.target.value);
    validation.account('tbTKNV', event.target.value);    
    document.getElementById('tbTKNV').innerHTML = validation.errors.tbTKNV || "";
});
// name
document.getElementById('name').addEventListener("input", (event) => {    
    validation.name('tbTen', event.target.value);    
    document.getElementById('tbTen').innerHTML = validation.errors.tbTen || "";
});
// email
document.getElementById('email').addEventListener("input", (event) => {    
    validation.email('tbEmail', event.target.value);    
    document.getElementById('tbEmail').innerHTML = validation.errors.tbEmail || "";
});
// password
document.getElementById('password').addEventListener("input", (event) => {    
    validation.password('tbMatKhau', event.target.value);    
    document.getElementById('tbMatKhau').innerHTML = validation.errors.tbMatKhau || "";
});
// basicSalary
document.getElementById('luongCB').addEventListener("input", (event) => {    
    validation.basicSalary('tbLuongCB', event.target.value);    
    document.getElementById('tbLuongCB').innerHTML = validation.errors.tbLuongCB || "";
});
// position
document.getElementById('chucvu').addEventListener("input", (event) => {    
    validation.required('tbChucVu', event.target.value);    
    document.getElementById('tbChucVu').innerHTML = validation.errors.tbChucVu || "";
});
// workTime
document.getElementById('gioLam').addEventListener("input", (event) => {    
    validation.workTime('tbGiolam', event.target.value);    
    document.getElementById('tbGiolam').innerHTML = validation.errors.tbGiolam || "";
});