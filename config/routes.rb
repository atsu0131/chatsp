Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  get '/users' => "users#search"
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:new, :create]
  end
end
