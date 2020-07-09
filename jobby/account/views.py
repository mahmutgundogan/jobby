from flask import render_template, request, Blueprint, redirect, url_for, flash, abort
from werkzeug.security import generate_password_hash, check_password_hash
from jobby.models import Users, Notification
from jobby.JobModels import Company
from datetime import datetime
from jobby import db, login_manager
from flask_login import login_user, logout_user, login_required, current_user
from utils import send_confirmation_email

account = Blueprint('account',__name__)

@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))

@account.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('public.index'))
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = Users.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                login_user(user)
                return redirect(url_for('public.index'))
            else:
                flash('Email veya şifre yanlış')
                return render_template('pages-login.html')
        else:
            flash('Email veya şifre yanlış')
            return render_template('pages-login.html')
    return render_template('pages-login.html')

@account.route('/confirm_email/<token>')
def confirm_email(token):
    user = Users.verify_confirmation_token(token)
    if not user:
        abort(404)
    notif = Notification.query.filter_by(notification_to=current_user, not_type=2).first_or_404()
    db.session.delete(notif)
    user.email_approved = True
    db.session.commit()
    return render_template('email_confirmation_notification.html')

@account.route('/signup', methods=['GET','POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('public.index'))
    if request.method == 'POST':
        email = request.form['email']
        account_type = request.form['account-type-radio']
        password = request.form['password']
        confirm = request.form['confirm']
        hashed_password = generate_password_hash(password, method='sha256')
        if account_type == 'freelancer':
            existing_user = Users.query.filter_by(email=email).first()
            if existing_user is None:
                user = Users(email=email, password=hashed_password,
                    member_since=datetime.utcnow())
                notif = Notification(notification_to=user, not_type=2)
                db.session.add(user)
                db.session.add(notif)
                db.session.commit()
                login_user(user)
                #send_confirmation_email(user)
                return render_template('email_confirmation_notification.html')
            flash('Email adresi kullanılıyor')
            return render_template('pages-register.html')
        else:
            existing_company = Company.query.filter_by(email=email).first()
            if existing_company is None:
                company = Company(email=email, password=hashed_password,
                    member_since=datetime.utcnow())
                #notif = Notification(notification_to=user, not_type=2)
                db.session.add(company)
                #db.session.add(notif)
                db.session.commit()
                login_user(company)
                #send_confirmation_email(user)
                return render_template('email_confirmation_notification.html')
            flash('Email adresi kullanılıyor')
            return redirect(request.url)
    return render_template('pages-register.html')

@account.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('public.index'))
