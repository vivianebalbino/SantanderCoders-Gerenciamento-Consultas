import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, FormsModule, NavbarComponent, LoadingComponent],
})
export class DashboardComponent {
  isLoading = false;
  appointments: any[] = [];
  isAdmin = false;
  selectedAppointment: any = null;
  newAppointment = { specialty: '', doctor: '', date: '', time: '', obs: '' };

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.fetchAppointments();
    this.isAdmin = localStorage.getItem('role') === 'ADMIN';
  }

  fetchAppointments() {
    this.isLoading = true;
    this.appointmentService.getAppointments().subscribe((data: any) => {
      this.appointments = data;
      this.isLoading = false;
    });
  }

  onCreateAppointment() {
    this.isLoading = true;
    this.appointmentService.createAppointment(this.newAppointment).subscribe({
      next: (response) => {
        alert('Consulta criada com sucesso!');
        this.fetchAppointments();
        this.newAppointment = { specialty: '', doctor: '', date: '', time: '', obs: '' };
        this.isLoading = false;
      },
      error: (error) => {
        alert('Erro ao criar a consulta!');
        this.isLoading = false;
      },
    });
  }

  completeAppointment(id: string) {
    const appointment = this.appointments.find((a) => a.id === id);
    if (appointment && appointment.status !== 'CANCELED') {
      this.appointmentService.completeAppointment(id).subscribe(() => {
        alert('Consulta concluída com sucesso!');
        this.fetchAppointments();
      });
    } else {
      alert('Não é possível concluir uma consulta cancelada.');
    }
  }

  cancelAppointment(id: string) {
    const appointment = this.appointments.find((a) => a.id === id);
    if (appointment && appointment.status !== 'DONE') {
      this.appointmentService.cancelAppointment(id).subscribe(() => {
        alert('Consulta cancelada com sucesso!');
        this.fetchAppointments();
      });
    } else {
      alert('Não é possível cancelar uma consulta concluída.');
    }
  }

  editAppointment() {
    if (this.selectedAppointment) {
      if (this.selectedAppointment.status !== 'DONE' && this.selectedAppointment.status !== 'CANCELED') {
        this.appointmentService.editAppointment(this.selectedAppointment.id, this.selectedAppointment).subscribe(() => {
          alert('Consulta editada com sucesso!');
          this.fetchAppointments();
          this.selectedAppointment = null;
        });
      } else {
        alert('Não é possível editar uma consulta concluída ou cancelada.');
      }
    }
  }

  selectAppointment(appointment: any) {
    this.selectedAppointment = { ...appointment }; // Cria uma cópia do objeto selecionado
  }

  delete(id: string) {
    if (confirm('Tem certeza que deseja excluir esta consulta?')) {
      this.appointmentService.deleteAppointment(id).subscribe(() => {
        alert('Consulta excluída com sucesso!');
        this.fetchAppointments();
      });
    }
  }
}
