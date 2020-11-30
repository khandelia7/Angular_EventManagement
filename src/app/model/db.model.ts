// make private, getter setter 
// oops concept is violated

export class employee {
    employeeID: number;
    username: String;
    password: String;
    role: {
        roleID: number;
        role: String;
    };
    post: {
        psotID: number;
        designation: String;
        department: String;
        level: number;
    };

    constructor(obj?: any) {
        this.employeeID = obj && obj.employeeID || null;
        this.username = obj && obj.username || null;
        this.password = obj && obj.password || null;
        this.role.roleID = obj && obj.role.roleID || null;
        this.role.role = obj && obj.role.role || null;
        this.post.psotID = obj && obj.post.psotID || null;
        this.post.designation = obj && obj.post.designation || null;
        this.post.department = obj && obj.post.department || null;
        this.post.level = obj && obj.post.level || null;
    }
}

export class post {
    psotID: number;
    designation: String;
    department: String;
    level: number;
}

export class event {
    eventID: number;
    event_name: String;
    countOfPanel: number;
    skillSet: String;
    eventDate: String;
    escalationTime: String;
    status: String;
    entryCount: number;
    post: {
        psotID: number;
        designation: String;
        department: String;
        level: number;
    };
    action: Boolean;

    // constructor(obj?: any) {
    //     this.eventID = obj && obj.eventID || null;
    //     this.event_name = obj && obj.event_name || null;
    //     this.countOfPanel = obj && obj.countOfPanel || null;
    //     this.skillSet = obj && obj.skillSet || null;
    //     this.eventDate = obj && obj.eventDate || null;
    //     this.escalationTime = obj && obj.escalationTime || null;
    //     this.status = obj && obj.status || null;
    //     this.entryCount = obj && obj.entryCount || null;
    //     //this.post.psotID = obj && obj.post.psotID || null;
    //     //this.post.designation = obj && obj.post.designation || null;
    //     //this.post.department = obj && obj.post.department || null;
    //     //this.post.level = obj && obj.post.level || null;
    //     this.action = obj && obj.action || null;
    // }
}

export class stat {
    statsID: number; // Always keep a class and not primitive data-types
    employee: {
        employeeID: number;
        username: String;
        password: String;
        role: {
            roleID: number;
            role: String;
        };
        post: {
            psotID: number;
            designation: String;
            department: String;
            level: number;
        };
    };
    event: {
        eventID: number;
        event_name: String;
        countOfPanel: number;
        skillSet: String;
        eventDate: String;
        escalationTime: String;
        status: String;
        entryCount: number;
        post: {
            psotID: number;
            designation: String;
            department: String;
            level: number;
        };
        action: Boolean;
    };
    date: String;
    flag: Boolean;

    constructor(obj?: any) {
        this.statsID = obj && obj.statsID || null;
        this.date = obj && obj.date || null;
        this.flag = obj && obj.flag || null;
        this.employee.employeeID = obj && obj.employee.employeeID || null;
        this.employee.username = obj && obj.employee.username || null;
        this.employee.password = obj && obj.employee.password || null;
        this.employee.role.roleID = obj && obj.role.roleID || null;
        this.employee.role.role = obj && obj.employee.role.role || null;
        this.employee.post.psotID = obj && obj.employee.post.psotID || null;
        this.employee.post.department = obj && obj.employee.post.department || null;
        this.employee.post.designation = obj && obj.employee.post.designation || null;
        this.employee.post.level = obj && obj.employee.post.level || null;
    }
}

export class message {
    msg: String;
}